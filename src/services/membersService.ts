import { Tables, TablesInsert } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

let members: Array<Tables<"members">> = null!;
let memberCallings: Array<Tables<"membercallings">> = null!;

let membersPromise: Promise<void> | undefined = undefined;
let memberCallingsPromise: Promise<void> | undefined = undefined;

const ensureMembers = async () => {
  if (!membersPromise) {
    membersPromise = Promise.resolve().then(async () => {
      const { data, error } = await supabase.from("members").select();
      if (error) {
        throw new Error(error.message);
      }
      members = data;
    });
  }

  await membersPromise;
};

export async function fetchMembers() {
  return ensureMembers().then(() => members);
}

// export async function fetchInvoiceById(id: number) {
//   return loaderDelayFn(() =>
//     ensureInvoices().then(() => {
//       const invoice = invoices.find((d) => d.id === id)
//       if (!invoice) {
//         throw new Error('Invoice not found')
//       }
//       return invoice
//     }),
//   )
// }

export async function postMember(newMember: TablesInsert<"members">) {
  await ensureMembers();
  const { data, error } = await supabase
    .from("members")
    .insert(newMember)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  members = [...members, data];
  return data;
}

// Member callings
const ensureMemberCallings = async () => {
  if (!membersPromise) {
    memberCallingsPromise = Promise.resolve().then(async () => {
      const { data, error } = await supabase.from("membercallings").select();
      if (error) {
        throw new Error(error.message);
      }
      memberCallings = data;
    });
  }

  await memberCallingsPromise;
};

export async function fetchMemberCallings() {
  return ensureMemberCallings().then(() => memberCallings);
}

export async function postMemberCalling(
  newMemberCalling: TablesInsert<"membercallings">
) {
  await ensureMemberCallings();
  const { data, error } = await supabase
    .from("membercallings")
    .insert(newMemberCalling)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  memberCallings = [...memberCallings, data];
  return data;
}

// export async function patchInvoice({
//   id,
//   ...updatedInvoice
// }: PickAsRequired<Partial<Invoice>, 'id'>) {
//   return actionDelayFn(() => {
//     invoices = produce(invoices, (draft) => {
//       const invoice = draft.find((d) => d.id === id)
//       if (!invoice) {
//         throw new Error('Invoice not found.')
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//       if (updatedInvoice.title?.toLocaleLowerCase()?.includes('error')) {
//         throw new Error('Ouch!')
//       }
//       Object.assign(invoice, updatedInvoice)
//     })

//     return invoices.find((d) => d.id === id)
//   })
// }
