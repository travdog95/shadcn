// import { produce } from "immer";
import { Tables, TablesInsert } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

let callings: Array<Tables<"callings">> = null!;
type CallingInsert = TablesInsert<"callings">;

let callingsPromise: Promise<void> | undefined = undefined;

const ensureCallings = async () => {
  if (!callingsPromise) {
    callingsPromise = Promise.resolve().then(async () => {
      const { data, error } = await supabase.from("callings").select();
      if (error) {
        throw new Error(error.message);
      }
      callings = data;
    });
  }

  await callingsPromise;
};

export async function fetchCallings() {
  return ensureCallings().then(() => callings);
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

export async function postCalling(newCalling: CallingInsert) {
  await ensureCallings();
  const { data, error } = await supabase
    .from("callings")
    .insert(newCalling)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  callings = [...callings, data];
  return data;
}

// Member callings bulk insert
export async function postCallings(newCallings: CallingInsert[]) {
  const { data, error } = await supabase.from("callings").insert(newCallings);
  if (error) {
    throw new Error(error.message);
  }
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
