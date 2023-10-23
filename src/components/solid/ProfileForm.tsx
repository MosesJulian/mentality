import { Show, createSignal } from 'solid-js';
import PrimaryButton from './shared/PrimaryButton';
import type { User } from '../../lib/firebase/types';
import { collections } from '../../lib/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';

export type ProfileFormProps = {
  class?: string;
  user: User;
};

type FormError = {
  path: string;
  message: string;
};

const ProfileForm = (props: ProfileFormProps) => {
  const [isLoading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal<FormError[]>([]);

  const handleSave = (e: SubmitEvent) => {
    e.preventDefault();

    setErrors([]);

    const target = e.currentTarget;
    if (target === null) return;

    const data = new FormData(target as HTMLFormElement);
    const requiredFields = ['full_name'];

    const notFilled = (field: string) => {
      const value = data.get(field)?.toString()?.trim();
      return value?.length === 0;
    };

    const unfilledFields = requiredFields.filter(notFilled);

    setErrors(
      unfilledFields.filter(notFilled).map((f) => ({
        path: f,
        message: 'This field is required',
      })),
    );

    if (unfilledFields.length > 0) return;

    setLoading(true);

    updateDoc(doc(collections.users, props.user.id), {
      name: data.get('full_name'),
      phoneNumber: data.get('phone_number'),
      dateOfBirth: data.get('date_of_birth'),
      gender: data.get('gender'),
      notes: data.get('notes'),
    }).finally(() => setLoading(false));
  };

  const hasError = (field: string) => {
    return errors().some((e) => e.path === field);
  };

  const getError = (field: string) => {
    return errors().find((e) => e.path === field)?.message;
  };

  return (
    <form class={`flex flex-col gap-6 w-full ${props.class}`} onSubmit={handleSave}>
      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Email</label>

        <input
          name="email"
          class="rounded-md border px-3 py-2 focus-visible:border-primary read-only:bg-gray-50"
          readonly
          value={props.user.email}
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Full Name</label>

        <input
          name="full_name"
          class="rounded-md border px-3 py-2 focus-visible:border-primary"
          value={props.user.name}
        />

        <Show when={hasError('full_name')}>
          <div class="text-red-500">{getError('full_name')}</div>
        </Show>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Phone Number</label>

        <input
          name="phone_number"
          class="rounded-md border px-3 py-2 focus-visible:border-primary"
          inputmode="tel"
          value={props.user.phoneNumber ?? ''}
        />

        <Show when={hasError('phone_number')}>
          <div class="text-red-500">{getError('phone_number')}</div>
        </Show>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Gender</label>

        <select class="rounded-md border px-3 py-2 focus-visible:border-primary">
          <option selected={props.user.gender === 'male'}>Male</option>
          <option selected={props.user.gender === 'female'}>Female</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Date of Birth</label>

        <input
          name="date_of_birth"
          class="rounded-md border px-3 py-2 focus-visible:border-primary"
          type="date"
          value={props.user.dateOfBirth ?? ''}
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-medium">Notes</label>

        <textarea
          name="notes"
          class="rounded-md border px-3 py-2 resize-y focus-visible:border-primary min-h-[50px]"
          cols="30"
          rows="2"
        >
          {props.user.notes ?? ''}
        </textarea>
      </div>

      <PrimaryButton class="mt-4">
        <Show when={!isLoading()} fallback="...">
          Save
        </Show>
      </PrimaryButton>
    </form>
  );
};

export default ProfileForm;
