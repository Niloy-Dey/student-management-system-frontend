import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',  // Add password field
    discordId: '',
    advisor: '', // Optional
    team: '', // Optional
    batch: '', // Optional
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    },
    address: {
      street: '',
      city: '',
      zip: '',
      country: ''
    },
    bio: '' // Optional
  });

  // State to manage advisor, team, batch options
  const [advisors, setAdvisors] = useState([]);
  const [teams, setTeams] = useState([]);
  const [batches, setBatches] = useState([]);

  // State to manage form submission and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch advisors, teams, and batches from the backend on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [advisorResponse, teamResponse, batchResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/advisors'),
          axios.get('http://localhost:5000/api/admin/teams'),
          axios.get('http://localhost:5000/api/admin/batches')
        ]);
        setAdvisors(advisorResponse.data);
        setTeams(teamResponse.data);
        setBatches(batchResponse.data);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Error fetching advisor, team, and batch options.');
      }
    };
    
    fetchOptions();
  }, []);

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks') || name.startsWith('address')) {
      const [category, field] = name.split('.');
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setSuccess(response.data.message);
      setLoading(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',  // Reset password
        discordId: '',
        advisor: '',
        team: '',
        batch: '',
        socialLinks: {
          github: '',
          linkedin: '',
          twitter: ''
        },
        address: {
          street: '',
          city: '',
          zip: '',
          country: ''
        },
        bio: ''
      });
      navigate('/student-management/student-list'); // Redirect to the students page after successful creation
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating student. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create New Student</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="discordId">Discord ID</label>
            <input
              type="text"
              className="form-control"
              id="discordId"
              name="discordId"
              value={formData.discordId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="advisor">Advisor</label>
            <select
              className="form-control"
              id="advisor"
              name="advisor"
              value={formData.advisor}
              onChange={handleChange}
            >
              <option value="">Select Advisor (Optional)</option>
              {advisors.map((advisor) => (
                <option key={advisor._id} value={advisor._id}>
                  {advisor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="team">Team</label>
            <select
              className="form-control"
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
            >
              <option value="">Select Team (Optional)</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="batch">Batch</label>
            <select
              className="form-control"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
            >
              <option value="">Select Batch (Optional)</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Social links */}
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="socialLinks.github">GitHub</label>
            <input
              type="text"
              className="form-control"
              id="socialLinks.github"
              name="socialLinks.github"
              value={formData.socialLinks.github}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="socialLinks.linkedin">LinkedIn</label>
            <input
              type="text"
              className="form-control"
              id="socialLinks.linkedin"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="socialLinks.twitter">Twitter</label>
            <input
              type="text"
              className="form-control"
              id="socialLinks.twitter"
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="address.street">Street</label>
            <input
              type="text"
              className="form-control"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="address.city">City</label>
            <input
              type="text"
              className="form-control"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="address.zip">ZIP</label>
            <input
              type="text"
              className="form-control"
              id="address.zip"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="address.country">Country</label>
            <input
              type="text"
              className="form-control"
              id="address.country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Student'}
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
