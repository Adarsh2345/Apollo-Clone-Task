"use client";

import { useState, useEffect } from 'react';

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState({
    modeOfConsult: [],
    experience: [],
    fees: [],
    language: [],
    facility: [],
  });

  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async (filters) => {
    try {
      setIsLoading(true);
      
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          queryParams.append(key, values.join(','));
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/list-doctors?${queryParams.toString()}`);
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(selectedFilters);
  }, [selectedFilters]);

  const handleCheckboxChange = (filterCategory, value) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[filterCategory].includes(value)
        ? prev[filterCategory].filter((item) => item !== value)
        : [...prev[filterCategory], value];
      
      return { 
        ...prev, 
        [filterCategory]: updatedCategory 
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      modeOfConsult: [],
      experience: [],
      fees: [],
      language: [],
      facility: [],
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-6">
            <div>
              <img
                src="https://images.apollo247.in/images/icons/apollo247.svg"
                alt="Apollo247 Logo"
                width="100"
                height="100"
              />
            </div>

            {/* Location Selector - Click events removed */}
            <div className="Tp location_chooseLocation__pPTJP">
              <span className="Up">
                <img 
                  srcSet="https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-1,c-at_max 50w, https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-2,c-at_max 100w, https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-3,c-at_max 150w, https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-4,c-at_max 200w, https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-5,c-at_max 250w, https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-6,c-at_max 300w" 
                  src="https://images.apollo247.in/images/ic_location_new.svg?tr=q-80,w-50,dpr-2,c-at_max 100w" 
                  sizes="50px" 
                  alt="chooseLocation" 
                  width="24" 
                  height="24" 
                  loading="lazy" 
                  fetchpriority="low" 
                  className="Gn lazy" 
                />
              </span>
              <div className="Vp">
                <label className="Wp">Select Location</label>
                <div className="Xp">
                  <p className="Yp">Select Address</p>
                  <span className="_r"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-1/2">
            <img
              src="https://images.apollo247.in/images/ic_search_new.svg"
              alt="Search"
              width="28"
              height="28"
              className="mr-2"
            />
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full bg-transparent border-none outline-none text-gray-800"
              readOnly
            />
          </div>

          <div className="text-blue-600 font-medium">Login</div>
        </div>

        {/* Navigation Bar - Click events removed */}
        <nav className="bg-white border-t shadow-sm">
          <ul className="flex justify-center space-x-6 py-2 text-sm font-medium text-gray-700">
            <li>Buy Medicines</li>
            <li>Find Doctors</li>
            <li>Lab Tests</li>
            <li>Circle Membership</li>
            <li>Health Records</li>
            <li>Diabetes Reversal</li>
            <li className="flex items-center gap-1">
              Buy Insurance
              <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded">New</span>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="mt-36 flex">
        {/* Left Filters */}
        <aside className="w-1/4 p-4 border-r bg-white">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">Filters</p>
            <button
              className="text-blue-600 hover:underline"
              onClick={clearFilters}
              aria-label="Clear All"
            >
              Clear All
            </button>
          </div>

          <div className="mb-4">
            <div className="text-blue-500">Show Doctors Near Me</div>
          </div>

          {/* Filter Categories - Only remaining click events */}
          {[
            { 
              label: 'Mode of Consult', 
              key: 'modeOfConsult', 
              options: ['PHYSICAL', 'ONLINE'], 
              labels: ['Hospital Visit', 'Online Consult'] 
            },
            { 
              label: 'Experience', 
              key: 'experience', 
              options: ['0-5', '6-10', '11-16', '16+'],
              labels: ['0-5 years', '6-10 years', '11-16 years', '16+ years']
            },
            { 
              label: 'Consultation Fees', 
              key: 'fees', 
              options: ['100-500', '500-1000', '1000+'],
              labels: ['₹100-500', '₹500-1000', '₹1000+']
            },
            { 
              label: 'Language', 
              key: 'language', 
              options: ['English', 'Hindi', 'Telugu'] 
            },
            { 
              label: 'Facility', 
              key: 'facility', 
              options: ['Apollo Hospital', 'Other Clinics'] 
            },
          ].map(({ label, key, options, labels }) => (
            <div key={key} className="mb-4">
              <p className="text-sm font-medium text-gray-800 mb-2">{label}</p>
              {options.map((option, idx) => (
                <label key={option} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedFilters[key].includes(option)}
                    onChange={() => handleCheckboxChange(key, option)}
                    className="mr-2"
                  />
                  <span className="text-gray-800">{labels ? labels[idx] : option}</span>
                </label>
              ))}
              {key === 'language' && (
                <div className="text-blue-500 text-sm mt-1">+10 More</div>
              )}
            </div>
          ))}
        </aside>

        {/* Right - Doctor Cards - Click events removed */}
        <main className="w-3/4 p-4">
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <p className="text-gray-600">Loading doctors...</p>
            ) : doctors.length === 0 ? (
              <p className="text-gray-600">No doctors found matching your filters.</p>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="flex border rounded-lg p-4 bg-white"
                >
                  <div className="mr-4">
                    <img
                      src={doctor.imageUrl || 'https://via.placeholder.com/80'}
                      alt={doctor.name}
                      className="rounded-full w-20 h-20 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
                      <p className="text-sm text-gray-700">{doctor.specialty}</p>
                      <p className="text-sm text-gray-700">
                        {typeof doctor.experience === 'string' ? 
                          `${doctor.experience} years` : 
                          `${doctor.experience} Years`} • {doctor.qualifications}
                      </p>
                      <p className="text-sm text-gray-700">{doctor.location}</p>
                      {doctor.clinic && (
                        <p className="text-sm text-gray-700">{doctor.clinic}</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-blue-600 font-semibold">
                        {typeof doctor.fees === 'string' ? 
                          `₹${doctor.fees}` : 
                          (doctor.fee ?? doctor.fees ?? doctor.consultationFee ?? 'Not available')}
                      </p>
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                        Consult Online
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
