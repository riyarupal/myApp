import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('https://your-backend-url/bfhl', parsedData);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or error with API call');
    }
  };

  const handleOptionChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { alphabets, numbers, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <strong>Alphabets:</strong> {alphabets.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <strong>Numbers:</strong> {numbers.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <strong>Highest lowercase alphabet:</strong> {highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Input Processor</h1>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        rows="10"
        cols="50"
        placeholder='Enter your JSON here'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <select multiple={true} value={selectedOptions} onChange={handleOptionChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      <div>{renderResponse()}</div>
    </div>
  );
}

export default App;
