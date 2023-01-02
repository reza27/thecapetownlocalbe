import { ReactNode } from 'react';
import { jsx, H1, Stack, Box, VisuallyHidden, Center, useTheme } from '@keystone-ui/core';
import {FormContainer} from '../../lib/FormContainer';


import { useState, Fragment, FormEvent, useRef, useEffect } from 'react';

import { Button } from '@keystone-ui/button';
import { TextInput } from '@keystone-ui/fields';
import { Notice } from '@keystone-ui/notice';

import { useMutation, gql } from '@keystone-6/core/admin-ui/apollo';
import { useRawKeystone, useReinitContext } from '@keystone-6/core/admin-ui/context';
import { useRouter } from '@keystone-6/core/admin-ui/router';
import { LoadingDots } from '@keystone-ui/loading';
//import { SigninContainer } from '@keystone-6/auth/src/components/SigninContainer';
//import { useRedirect } from '@keystone-6/auth/src/lib/useFromRedirect';
import {useRedirect} from '../../lib/redirect';


type SigninPageProps = {
  identityField: string;
  secretField: string;
  mutationName: string;
  mutationNameReset: string;
  successTypename: string;
  failureTypename: string;
};

export const SignIn = (props: SigninPageProps) => () => <SigninPage {...props} />;

export const SigninPage = ({
  identityField,
  secretField,
  mutationName,
  mutationNameReset,
  successTypename,
  failureTypename,
}: SigninPageProps) => {
  const mutation = gql`
    mutation($identity: String!, $secret: String!) {
      authenticate: ${mutationName}(${identityField}: $identity, ${secretField}: $secret) {
        ... on ${successTypename} {
          item {
            id
          }
        }
        ... on ${failureTypename} {
          message
        }
      }
    }
  `;

  const mutationReset = gql`
    mutation($email: String!) {
      ${mutationNameReset}(${identityField}: $email)
    }
  `;

  const [mode, setMode] = useState<'signin' | 'forgot password'>('signin');
  const [state, setState] = useState({ identity: '', secret: '' });
  const [sentEmail, setSentEmail] = useState(false);

  const identityFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    identityFieldRef.current?.focus();
    setSentEmail(false);

  }, [mode]);

  const [mutate, { error, loading, data }] = useMutation(mutation);
  const [mutateReset] = useMutation(mutationReset, {onCompleted: (data)=> {
    setSentEmail(data.sendUserPasswordResetLink)
  }});
  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();
  const redirect = useRedirect();

  // This useEffect specifically handles ending up on the signin page from a SPA navigation
  useEffect(() => {
    if (rawKeystone.authenticatedItem.state === 'authenticated') {
      router.push(redirect);
    }
  }, [rawKeystone.authenticatedItem, router, redirect]);

  if (rawKeystone.authenticatedItem.state === 'authenticated') {
    return (
      <Center fillView>
        <LoadingDots label="Loading page" size="large" />
      </Center>
    );
  }

  return (
    <FormContainer title="Keystone - Sign In">
      <Stack
        gap="xlarge"
        as="form"
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          if (mode === 'signin') {
            try {
              let result = await mutate({
                variables: {
                  identity: state.identity,
                  secret: state.secret,
                },
              });
              if (result.data.authenticate?.__typename !== successTypename) {
                return;
              }
            } catch (err) {
              return;
            }
            reinitContext();
            router.push(redirect);
          }
          else if (mode === 'forgot password') {
            try {
              let result = await mutateReset({
                variables: {
                  email: state.identity
                }
              });
              console.log('result1', result.data.sendUserPasswordResetLink)
          } catch (err) {
            setSentEmail(false);

            return;
          }

        }
      }}
      >
      {mode === 'signin' ?
        <H1>Sign In</H1> :
        <H1>Forgot Password</H1>}
        {error && (
          <Notice title="Error" tone="negative">
            {error.message}
          </Notice>
        )}

        {sentEmail && (
          <Notice title="Success" tone="positive">
            Password reset link sent to your email.
          </Notice>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <Notice title="Error" tone="negative">
            {data?.authenticate.message}
          </Notice>
        )}
        <Stack gap="medium">
          <VisuallyHidden as="label" htmlFor="identity">
            {identityField}
          </VisuallyHidden>
          <TextInput
            id="identity"
            name="identity"
            value={state.identity}
            onChange={e => setState({ ...state, identity: e.target.value })}
            placeholder={identityField}
            ref={identityFieldRef}
          />
          {mode === 'signin' && (
            <Fragment>
              <VisuallyHidden as="label" htmlFor="password">
                {secretField}
              </VisuallyHidden>
              <TextInput
                id="password"
                name="password"
                value={state.secret}
                onChange={e => setState({ ...state, secret: e.target.value })}
                placeholder={secretField}
                type="password"
              />
            </Fragment>
          )}
        </Stack>

        {mode === 'forgot password' ? (
          <Stack gap="medium" across>
            <Button type="submit" weight="bold" tone="active" isDisabled={state.identity.length < 1}>
              Log reset link
            </Button>
            <Button weight="none" tone="active" onClick={() => setMode('signin')}>
              Go back
            </Button>
          </Stack>
        ) : (
          <Stack gap="medium" across>
            <Button
              weight="bold"
              tone="active"
              isDisabled={state.identity.length < 1}
              isLoading={
                loading ||
                // this is for while the page is loading but the mutation has finished successfully
                data?.authenticate?.__typename === successTypename
              }
              type="submit"
            >
              Sign In
            </Button>
            {/* Disabled until we come up with a complete password reset workflow */}
            <Button weight="none" tone="active" onClick={() => setMode('forgot password')}>
              Forgot your password?
            </Button>
          </Stack>
        )}
      </Stack>
      </FormContainer>
  )
};

export default SignIn({
  "identityField":"email",
  "secretField":"password",
  "mutationName":"authenticateUserWithPassword",
  "mutationNameReset":"sendUserPasswordResetLink",
  "successTypename":"UserAuthenticationWithPasswordSuccess",
  "failureTypename":"UserAuthenticationWithPasswordFailure"});
