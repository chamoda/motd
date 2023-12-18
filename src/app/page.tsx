import Motd from "@/components/Motd";

export default async function Home() {
  const response = await fetch(process.env.URL + "/api/message");
  const data = await response.json();

  return (
    <main>
      <Motd data={data} />
    </main>
  );
}
