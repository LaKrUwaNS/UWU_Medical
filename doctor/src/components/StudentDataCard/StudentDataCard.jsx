import React from 'react';
import './StudentDataCard.css';

const students = [
  {
    name: 'Nirmal',
    department: 'Information Communication',
    emn: 'BBST/22/XX',
    image: '/images/nirmal.jpg',
  },
  {
    name: 'Prasaa',
    department: 'BIO system technology',
    emn: 'BBST/22/XX',
    image: '/images/prasaa.jpg',
  },
  {
    name: 'Ashen',
    department: 'Information Communication',
    emn: 'BBST/22/XX',
    image: '/images/ashen.jpg',
  },
  {
    name: 'Kavindu',
    department: 'Engineering Technology',
    emn: 'BBST/22/XX',
    image: '/images/kavindu.jpg',
  },
];

const StudentDataCard = () => {
  return (
    <div className="student-table-container">
      <div className="table-header-row">
        <h3 className='student-data'>Student Data</h3>
        <span className="dots">•••</span>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>EMN</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx}>
              <td className="student-name-cell">
                <img src={student.image} alt={student.name} className="avatar" />
                {student.name}
              </td>
              <td>{student.department}</td>
              <td>{student.emn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDataCard;
