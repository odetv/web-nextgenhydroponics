import InfoProfile from "@/components/InfoProfile";

export default function Profile() {
  return (
    <main className="flex flex-col justify-start items-center min-h-screen pt-6 sm:pt-12 pb-8">
      <p className="font-bold text-3xl">Profile</p>
      <InfoProfile />
    </main>
  );
}
