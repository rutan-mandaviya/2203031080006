import { useState } from "react";


import { logEvent } from "../utils/logger";
import { createShortUrl } from "../data/Urlstore";
import { isValidShortcode, isValidURL, isValidValidity } from "../utils/validator";

export default function UrlShortenerForm() {
  const [forms, setForms] = useState(Array(5).fill({ longUrl: "", validity: "", shortcode: "" }));
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = (i, field, val) => {
    const updated = [...forms];
    updated[i][field] = val;
    setForms(updated);
  };

  const handleSubmit = () => {
    const newResults = [], newErrors = [];

    forms.forEach((form, i) => {
      if (!form.longUrl) return;

      if (!isValidURL(form.longUrl)) {
        newErrors.push(`Row ${i + 1}: Invalid URL`);
        return;
      }
      if (form.shortcode && !isValidShortcode(form.shortcode)) {
        newErrors.push(`Row ${i + 1}: Invalid shortcode`);
        return;
      }
      if (form.validity && !isValidValidity(form.validity)) {
        newErrors.push(`Row ${i + 1}: Invalid validity`);
        return;
      }

      try {
        const { shortCode, expiryTime } = createShortUrl({
          longUrl: form.longUrl,
          customCode: form.shortcode,
          validity: form.validity ? Number(form.validity) : undefined,
        });

        logEvent("URL_CREATED", "Short URL created", { shortCode });
        newResults.push({
          shortUrl: `http://localhost:3000/${shortCode}`,
          expiry: new Date(expiryTime).toLocaleString(),
          original: form.longUrl,
        });
      } catch (err) {
        newErrors.push(`Row ${i + 1}: ${err.message}`);
      }
    });

    setResults(newResults);
    setErrors(newErrors);
  };

  

  return (
    <div className="space-y-4">
      {forms.map((form, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Long URL"
            className="border p-2 rounded"
            value={form.longUrl}
            onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
          />
          <input
            type="text"
            placeholder="Validity (min)"
            className="border p-2 rounded"
            value={form.validity}
            onChange={(e) => handleChange(idx, "validity", e.target.value)}
          />
          <input
            type="text"
            placeholder="Custom Shortcode"
            className="border p-2 rounded"
            value={form.shortcode}
            onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
          />
        </div>
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Shorten URLs
      </button>

      {errors.length > 0 && (
        <div className="text-red-600">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {console.log(results)}
        
        {results.map((res, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50">
            <p><strong>Short URL:</strong> <a href={res.original} className="text-blue-600 underline">{res.shortUrl}</a></p>
            <p><strong>Expires at:</strong> {res.expiry}</p>
            <p><strong>Original:</strong> {res.original}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
