// import React from "react"
// import img from "../images/pricing.jpg"
// import Back from "../common/Back"
// import "./contact.css"

// const Contact = () => {
//   return (
//     <>
//       <section className='contact mb'>
//         <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
//         <div className='container'>
//           <form className='shadow'>
//             <h4>Fillup The Form</h4> <br />
//             <div>
//               <input type='text' placeholder='Name' />
//               <input type='text' placeholder='Email' />
//             </div>
//             <input type='text' placeholder='Subject' />
//             <textarea cols='30' rows='10'></textarea>
//             <button>Submit Request</button>
//           </form>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Contact

import React, { useState } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    fromDate: "",
    toDate: "",
    subject: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact details');
      }

      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        city: "",
        fromDate: "",
        toDate: "",
        subject: ""
      });

      alert('Contact details submitted successfully!');
    } catch (error) {
      console.error('Error submitting contact details:', error);
      alert('Failed to submit contact details. Please try again later.');
    }
  };

  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Fill up The Form</h4> <br />
            <div>
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' />
              <input type='text' name='email' value={formData.email} onChange={handleChange} placeholder='Email' />
            </div>
            <div>
              <input type='text' name='mobile' value={formData.mobile} onChange={handleChange} placeholder='Mobile' />
              <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder='City' />
            </div>
            <div>
              From Date
              <input type='date' name='fromDate' value={formData.fromDate} onChange={handleChange} placeholder='From Date' />
              To Date
              <input type='date' name='toDate' value={formData.toDate} onChange={handleChange} placeholder='To Date' />
            </div>
            <input type='text' name='subject' value={formData.subject} onChange={handleChange} placeholder='Subject' />
            <textarea cols='30' rows='10'></textarea>
            <button type='submit'>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

