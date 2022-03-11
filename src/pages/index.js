import React, { useState } from "react";
import getTemplate from "../components/template";

const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(0);

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
      const name = rowArray.join(" ");

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

  const template = getTemplate(
    items,
    deliveryDate,
    deliveryPrice
  );

  console.log(items)
  console.log(template)
  return (
    <div>
      <textarea cols={50} rows={20} onChange={formatString}/>
      <div>
        <label>Delivery Date</label>
        <input type="text" name="deliveryDate" placeholder="Delivery Date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)}/>
      </div>
      <div>
        <label>Delivery Price</label>
        <input type="text" name="deliveryPrice" placeholder="Delivery Price" value={deliveryPrice} onChange={(e) => setDeliveryPrice(e.target.value)}/>

      </div>
      <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(template)}`} download={`${deliveryDate}.js`}>
        AAAAAAAAAAAAAA
      </a>
      {/*<div>{formatted}</div>*/}
    </div>
  );
};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default IndexPage
