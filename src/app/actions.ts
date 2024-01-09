"use server";

export async function chooseLayout(formData: FormData) {
  const selectedLayout = formData.get("layout");

  console.log(selectedLayout);
}
