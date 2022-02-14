import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [items, setItems] = useState([]);

  const formatString = (e) => {
    const text = e.target.value;
    if (!text.length) {
      return;
    }

    // split the string by new lines and trim extra whitespace
    const textArray = prepareText(text);

    const items = textArray.map(row => {
      const rowArray = row.split(" ");
      const quantity = parseInt(rowArray.shift());
      const fullPrice = parseInt(rowArray.pop().match(/\d/g).join(""));
      const price = Math.floor(fullPrice / quantity);
      const name = rowArray.join(" ").substr(2);

      return {
        quantity,
        price,
        name,
      }
    });

    setItems(items);
  };

  const prepareText = text => {
    return text
      .split("\n")
      .map(row => row.trim())
      .filter(row => row.length !== 0 && Number.isInteger(parseInt(row.charAt(0))))
  };

  const formatItems = () => {
    return items.map(item => {
      return `{ quantity: ${item.quantity}, name: "${item.name}", price: ${item.price} }`
    }).join(", ")
  };

  const formatted = `const items = [ ${formatItems()} ]`;

  return (
    <div>
      <textarea cols={50} rows={20} onChange={formatString}/>
      <div>{formatted}</div>
    </div>
  );
};

export default IndexPage
