import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLongUrl } from "../data/Urlstore"; // using localStorage version
import { logEvent } from "../utils/logger";

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortcode) {
      navigate("/?error=Invalid+shortcode");
      return;
    }

    try {
      const longUrl = getLongUrl(shortcode); // ✅ now supports localStorage
      logEvent("REDIRECT", "Redirecting user", { shortcode });
      window.location.href = longUrl; // 🔁 actual redirect
    } catch (err) {
      logEvent("REDIRECT_ERROR", err.message, { shortcode });
      navigate("/?error=" + encodeURIComponent(err.message));
    }
  }, [shortcode, navigate]);

  return null; // no visible UI
}
