import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CheckOutForm from "../../_components/check-out-form";

async function CheckOutPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <CheckOutForm user={user} />;
}

export default CheckOutPage;
