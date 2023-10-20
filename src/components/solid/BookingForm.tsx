import { add, eachDayOfInterval, format, isSameDay, setHours, startOfHour } from 'date-fns';
import { type BookingHour } from '../../lib/firebase/types';
import PrimaryButton from './shared/PrimaryButton';
import { For, Show, createSignal } from 'solid-js';
import { addDoc } from 'firebase/firestore';
import { collections } from '../../lib/firebase/client';

export type BookingFormProps = {
  availableDaysPerWeek: number[];
  availableHoursPerDay: number[];
  takenHours: BookingHour[];
  userId: string;
  expertId: string;
  class?: string;
};

type AvailableDay = {
  day: Date;
  hours: number[];
};

const BookingForm = (props: BookingFormProps) => {
  const now = new Date();

  const availableDays: AvailableDay[] = eachDayOfInterval({
    start: now,
    end: add(now, { weeks: 1 }),
  })
    .filter((date) => props.availableDaysPerWeek.includes(date.getDay()))
    .map((date) => {
      return {
        day: date,
        hours: props.availableHoursPerDay.filter((hour) => {
          const d = startOfHour(setHours(date, hour));
          const isTaken = props.takenHours.includes(format(d, 'yyyy-MM-dd HH'));

          return !isTaken;
        }),
      };
    });

  const [selectedDay, setSelectedDay] = createSignal<AvailableDay | undefined>(availableDays.at(0));
  const [selectedHour, setSelectedHour] = createSignal<number | undefined>(undefined);

  const [isModalOpen, setModalOpen] = createSignal(false);
  const [bookingDetails, setBookingDetails] = createSignal('');

  const [isLoading, setLoading] = createSignal(false);

  const selectedDayHours = () => selectedDay()?.hours ?? [];

  const handleSelectDay = (day: AvailableDay) => {
    const newDay = setSelectedDay(day);
    setSelectedHour((prevHour) => {
      return newDay.hours.find((h) => h === prevHour);
    });
  };

  const handleSelectHour = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleBook = async (e: SubmitEvent) => {
    e.preventDefault();

    const details = bookingDetails().trim();
    const day = selectedDay()?.day;
    const hour = selectedHour();

    if (details.length === 0 || day === undefined || hour === undefined) return;

    setLoading(true);

    try {
      await addDoc(collections.bookings, {
        userId: props.userId,
        expertId: props.expertId,
        hour: format(setHours(day, hour), 'yyyy-MM-dd HH'),
        status: 'pending',
        details,
      });
    } finally {
      setLoading(false);
    }

    window.location.assign('/bookings');
    handleCloseModal();
  };

  return (
    <>
      <div class={`flex flex-col justify-between w-full ${props.class}`}>
        <div>
          <h3 class="text-2xl font-semibold mt-8">Book a Consultation</h3>
          <div class="flex items-center gap-4 mt-4 pb-2 overflow-x-auto max-w-full">
            <For each={availableDays}>
              {(day) => (
                <div
                  onClick={() => handleSelectDay(day)}
                  class="text-center rounded-md border px-4 py-1 duration-200 cursor-pointer hover:border-primary-dark hover:text-primary-dark"
                  classList={{
                    'border-primary-dark text-primary-dark': selectedDay() === day,
                  }}
                >
                  <div class="text-sm">{format(day.day, 'EEEE')}</div>
                  <div class="whitespace-nowrap">{format(day.day, 'dd MMM')}</div>
                </div>
              )}
            </For>
          </div>

          <div class="h-px w-full bg-slate-300 mt-2"></div>

          <div class="mt-6 flex flex-wrap gap-1">
            <For each={selectedDayHours()}>
              {(hour) => (
                <div
                  onClick={() => handleSelectHour(hour)}
                  class="text-center rounded-md border px-4 py-1 duration-200 cursor-pointer hover:border-primary-dark hover:text-primary-dark"
                  classList={{
                    'border-primary-dark text-primary-dark': selectedHour() === hour,
                  }}
                >
                  <div class="text-sm">{`${hour}:00 - ${hour + 1}:00`}</div>
                </div>
              )}
            </For>
          </div>
        </div>

        <PrimaryButton
          class="mt-4 w-full"
          disabled={selectedHour() === undefined}
          onClick={handleOpenModal}
        >
          Book
        </PrimaryButton>
      </div>

      <div
        class="fixed inset-0 overflow-y-auto z-10"
        classList={{
          hidden: !isModalOpen(),
        }}
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" onClick={handleCloseModal}></div>

        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <form
            onSubmit={handleBook}
            class="flex flex-col justify-between w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-h-[320px]"
          >
            <div>
              <label class="text-2xl font-semibold">Booking Details</label>

              <textarea
                name="details"
                class="mt-4 w-full border px-2 py-1 resize-y focus-visible:border-primary-dark min-h-[100px]"
                placeholder="What are you looking for?"
                cols="30"
                rows="10"
                onInput={(e) => setBookingDetails(e.currentTarget.value)}
              ></textarea>
            </div>

            <PrimaryButton class="mt-4">
              <Show when={!isLoading()} fallback="...">
                Book
              </Show>
            </PrimaryButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
