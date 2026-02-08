import { useState, useCallback, useEffect, useRef } from "react";

// Conversion rate: 1 BNB = 10,000 ZLN
const ZLN_RATE = 10000;

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 150;

export const useZlnConversion = () => {
  const [bnbAmount, setBnbAmount] = useState("");
  const [zlnAmount, setZlnAmount] = useState("");
  const [lastEdited, setLastEdited] = useState(null);
  const debounceTimeout = useRef(null);

  // Format number to max decimals
  const formatBnb = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    // Max 6 decimals for BNB
    return num.toFixed(6).replace(/\.?0+$/, "");
  };

  const formatZln = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    // Max 2 decimals for ZLN
    return num.toFixed(2).replace(/\.?0+$/, "");
  };

  // Convert BNB to ZLN
  const bnbToZln = useCallback((bnb) => {
    if (!bnb || bnb === "") return "";
    const num = parseFloat(bnb);
    if (isNaN(num) || num <= 0) return "";
    return (num * ZLN_RATE).toString();
  }, []);

  // Convert ZLN to BNB
  const zlnToBnb = useCallback((zln) => {
    if (!zln || zln === "") return "";
    const num = parseFloat(zln);
    if (isNaN(num) || num <= 0) return "";
    return (num / ZLN_RATE).toString();
  }, []);

  // Handle BNB input change
  const handleBnbChange = useCallback((value) => {
    // Clear any pending debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Validate input
    if (value === "" || value === "0" || /^\d*\.?\d*$/.test(value)) {
      setBnbAmount(value);
      setLastEdited("BNB");

      // Debounce the conversion
      debounceTimeout.current = setTimeout(() => {
        if (value && value !== "" && parseFloat(value) > 0) {
          const convertedZln = bnbToZln(value);
          setZlnAmount(convertedZln);
        } else {
          setZlnAmount("");
        }
      }, DEBOUNCE_DELAY);
    }
  }, [bnbToZln]);

  // Handle ZLN input change
  const handleZlnChange = useCallback((value) => {
    // Clear any pending debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Validate input
    if (value === "" || value === "0" || /^\d*\.?\d*$/.test(value)) {
      setZlnAmount(value);
      setLastEdited("ZLN");

      // Debounce the conversion
      debounceTimeout.current = setTimeout(() => {
        if (value && value !== "" && parseFloat(value) > 0) {
          const convertedBnb = zlnToBnb(value);
          setBnbAmount(convertedBnb);
        } else {
          setBnbAmount("");
        }
      }, DEBOUNCE_DELAY);
    }
  }, [zlnToBnb]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    bnbAmount,
    zlnAmount,
    lastEdited,
    handleBnbChange,
    handleZlnChange,
    zlnRate: ZLN_RATE,
    formatBnb,
    formatZln,
  };
};
