import MOTDData from "@/components/MOTDData";

export default async function Home() {
  const response = await fetch(process.env.URL + "/api/message");
  const data = await response.json();

  return (
    <main>
      <MOTDData data={data} />
    </main>
  );
}
