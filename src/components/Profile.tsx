import Image from "next/image";

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div
          className="h-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "https://media.istockphoto.com/id/1318242748/photo/organic-hydroponic-vegetable-garden-at-greenhouse-and-light-of-sunset.jpg?s=612x612&w=0&k=20&c=ySJynBzIn547iV1V4MuErqM6FphLESq6dH0U-wJIUe8=",
          }}
        ></div>
        <div className="flex justify-center -mt-16">
          <Image
            className="rounded-full border-4 border-white"
            src="/profile.jpg"
            alt="Profile"
            width={96}
            height={96}
          />
        </div>
        <div className="text-center px-6 pb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            Danish Heilium
          </h2>
          <p className="text-gray-600">Ui/Ux Designer</p>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque posuere fermentum urna, eu condimentum mauris tempus
            ut. Donec fermentum blandit aliquet.
          </p>
          <div className="mt-4">
            <p className="text-gray-600">Follow me on</p>
            <div className="flex justify-center mt-2">
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
