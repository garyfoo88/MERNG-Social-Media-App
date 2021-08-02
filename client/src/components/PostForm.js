import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
function PostForm() {
  const [errorStatus, setErrorStatus] = useState(false);
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPosts, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
    //Added on error to handle apollo errors
    onError: () => {
      setErrorStatus(true);
    },
  });

  function createPostCallback() {
    createPosts();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Craete a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="What's on your mind?"
            name="body"
            onChange={(e) => {
              if (e.target.value.trim() !== '') {
                setErrorStatus(false)
              }
              onChange(e)
            }}
            value={values.body}
            error={errorStatus ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {errorStatus && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error?.graphQLErrors[0]?.message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
