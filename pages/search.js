// pages/search.js
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

const AdvancedSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const onSubmit = (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&q=${data.q}`;

    setSearchHistory((current) => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
  };

  return (
    <div>
      <h1>Advanced Search</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")}>
            <option value="Title">Title</option>
            <option value="Tags">Tags</option>
            <option value="Artist or Culture">Artist or Culture</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control type="text" {...register("geoLocation")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" {...register("medium")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register("isHighlight")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Currently on View"
            {...register("isOnView")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Query</Form.Label>
          <Form.Control
            type="text"
            {...register("q", { required: true })}
            isInvalid={!!errors.q}
          />
          {errors.q && (
            <Form.Control.Feedback type="invalid">
              Query is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
