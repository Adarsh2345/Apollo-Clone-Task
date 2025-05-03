// components/DoctorCard.jsx
export default function DoctorCard({ doctor }) {
    return (
      <div className="border rounded-lg p-4 shadow-md mb-4">
        <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
        <p className="text-gray-700">Experience: {doctor.experience} years</p>
        <p className="text-gray-700">Fees: ₹{doctor.fees}</p>
        <p className="text-gray-700">Languages: {doctor.language.join(', ')}</p>
        <p className="text-gray-700">Facilities: {doctor.facility.join(', ')}</p>
        <p className="text-gray-700">Consult Modes: {doctor.modeOfConsult.join(', ')}</p>
      </div>
    );
  }
  