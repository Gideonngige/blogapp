const clients = [
  {
    name: "Ambumeadow Limited",
    project: "Hospital Management System",
    description: "Web-based system for managing hospital operations and patient records.",
    website: "https://www.ambumeadow.com", 
  },
  {
    name: "ChamaVault",
    project: "Group Savings & Investment App",
    description: "Mobile app for managing chamas, loans, and investments.",
    website: "https://www.chamavault.online", // replace with actual link
  },
  {
    name: "VinCab",
    project: "A Uber like Taxi App",
    description: "Mobile app for taxi booking and management.",
    website: "https://www.vincab.services", // replace with actual link
  },
  {
    name: "Open Gate Foundation",
    project: "A website for NGO",
    description: "Website development for Open Gate Foundation to enhance their online presence.",
    website: "https://www.ogfkenya.org", // replace with actual link
  },
];

export default function ClientsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Clients & Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client, i) => (
            <a
              key={i}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{client.name}</h3>
              <p className="text-blue-600 font-semibold mb-2">{client.project}</p>
              <p className="text-gray-600 text-sm">{client.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
