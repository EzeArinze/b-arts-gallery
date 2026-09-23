"use server";

// import { backendClient } from "@/sanity/lib/backend-cLient";
import { sanityFetch } from "@/sanity/lib/live";
import { PROCESSED_ORDER } from "@/sanity/lib/queries";

export async function isOrderAlreadyProcessed(reference: string) {
  const { data: payment } = await sanityFetch({
    query: PROCESSED_ORDER,
    params: { reference },
  });

  return !!payment;
}

// export async function saveOrderTransaction({
//   orderDoc,
//   artworkIds,
// }: {
//   orderDoc: any;
//   artworkIds: string[];
// }) {
//   const tx = backendClient.transaction();

//   // 1️⃣ Create order
//   tx.create(orderDoc);

//   // 2️⃣ Mark artworks as sold
//   artworkIds.forEach((artId) => {
//     tx.patch(artId, (patch) =>
//       patch.setIfMissing({ isSold: false }).set({ isSold: true }),
//     );
//   });

//   await tx.commit();
// }
