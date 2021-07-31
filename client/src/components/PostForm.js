import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
function PostForm() {
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
      newData = [result.data.createPost, ...data.getPosts]
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
          ...data,
          getPosts: {
              newData
          }
      } });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPosts();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Craete a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="What's on your mind?"
          name="body"
          onChange={onChange}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
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
