export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">About Us</h1>
        <p className="text-lg mb-6 text-gray-600">
          We are a team of passionate developers, designers, and strategists committed to building intuitive and impactful digital products. Our mission is to solve real-world problems through innovation, creativity, and technology.
        </p>

        <div className="grid gap-6 md:grid-cols-3 text-left mt-10">
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Empower individuals and businesses by creating efficient and scalable digital solutions.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be a global leader in user-focused innovation and sustainable technology.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Innovation</li>
              <li>Integrity</li>
              <li>Customer Focus</li>
              <li>Teamwork</li>
            </ul>
          </div>
        </div>

        {/* Developer Section */}
        <div className="mt-16 text-left bg-gray-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">About the Developer</h2>
          <div className="md:flex items-center gap-6">
            <img
              src="https://res.cloudinary.com/dc68huvjj/image/upload/v1748097763/ushindi_yeddi2.jpg" // Replace with your actual image URL if available
              alt="Gideon Ushindi"
              className="w-28 h-28 rounded-full border-2 border-blue-500 object-cover mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Gideon Ushindi</h3>
              <p className="text-gray-600 mt-2">
                Gideon Ushindi is a passionate Software Engineer and technology enthusiast based in Meru, Kenya, with strong experience in React, React Native, Flutter, Dart, Php,  Django, Laravel, WordPress, and UI/UX. He is also a machine learning enthusiast with a keen interest in building intelligent, data-driven systems. Gideon is focused on creating practical, impactful digital solutions in the areas of finance, education, health, and agriculture, using technology to solve real-world problems and drive innovation.
              </p>
              <p className="text-blue-600 mt-2">
                <a href="mailto:ushindigideon@gmail.com" className="hover:underline">ushindigideon@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
  <a
    href="https://paystack.shop/pay/1uy0h8i1yw" // Replace this
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-500 transition"
  >
    ☕ Buy me a coffee
  </a>
</div>
        </div>
      </div>
    </div>
  );
}
