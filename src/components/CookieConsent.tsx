import React, { useState, useEffect } from "react";

const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<string | null>(
    document.cookie.includes("cookieConsent=accepted") ? "accepted" : null
  );

  const handleConsentAccept = () => {
    document.cookie = "cookieConsent=accepted; path=/";
    setConsent("accepted");
  };

  useEffect(() => {
    // if (!consent) {
    //   alert(
    //     "Situs web ini menggunakan cookies untuk meningkatkan pengalaman pengguna."
    //   );
    // }
  }, [consent]);

  return (
    <div>
      {!consent && (
        <div className="cookie-consent">
          <p>
            Situs web ini menggunakan cookies untuk meningkatkan pengalaman
            pengguna.
          </p>
          <button onClick={handleConsentAccept}>Terima</button>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
