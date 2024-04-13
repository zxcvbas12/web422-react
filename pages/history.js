// pages/history.js
import React from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { Card, ListGroup, Button } from "react-bootstrap";
import { searchHistoryAtom } from "../store";

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => {
      const updatedHistory = [...current];
      updatedHistory.splice(index, 1);
      return updatedHistory;
    });
  };

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <div>
      <h1>Search History</h1>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                {Object.keys(historyItem).map((key, i) => (
                  <div key={i}>
                    <strong>{key}:</strong> {historyItem[key]}
                  </div>
                ))}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end mt-2"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default History;
