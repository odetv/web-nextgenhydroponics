import BlogGallery from "../../components/BlogGallery";

export default function Blog() {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-8 pb-8">
      <div className="flex flex-col gap-1 pb-8">
        <h1 className="font-bold text-3xl">Publikasi Kegiatan</h1>
        <p>Ikuti Keseruan Kegiatan Kami</p>
      </div>
      <BlogGallery />
    </div>
  );
}
