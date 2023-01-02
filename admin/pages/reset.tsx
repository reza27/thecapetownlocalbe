import { ReactNode } from 'react';
import { jsx, H1, Stack, Box, VisuallyHidden, Center, useTheme } from '@keystone-ui/core';

import { useState, Fragment, FormEvent, useRef, useEffect } from 'react';

import { Button } from '@keystone-ui/button';
import { TextInput } from '@keystone-ui/fields';
import { Notice } from '@keystone-ui/notice';

import { useMutation, gql } from '@keystone-6/core/admin-ui/apollo';
import { useRawKeystone, useReinitContext } from '@keystone-6/core/admin-ui/context';
import { useRouter } from '@keystone-6/core/admin-ui/router';
import { LoadingDots } from '@keystone-ui/loading';
import { useRedirect } from '../../lib/redirect';
import { FormContainer } from '../../lib/FormContainer';


/** @jsxRuntime classic */
/** @jsx jsx */

export default function ResetPassword () {

  const [mode, setMode] = useState<'signin' | 'forgot password'>('signin');
  const [state, setState] = useState({ identity: '', secret: ''});
  const [result, setResult] = useState(undefined);
  const [resultError, setResultError] = useState('');

  const identityFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    identityFieldRef.current?.focus();
  }, [mode]);

  const mutation = gql`
    mutation($email: String!, $token: String!, $password: String!) {
      redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
        message
      }
    }
  `;

  const [mutate, { error, loading, data }] = useMutation(mutation);
  //const [mutateReset, { data1, loading1, error1 }] = useMutation(mutationReset);
  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();
  const redirect = useRedirect();

    return (
        <FormContainer title="Keystone - Reset">
        <Stack
          gap="xlarge"
          as="form"
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            let params = (new URL(document.location)).searchParams;
            let token = params.get("token");
              try {
                let result = await mutate({
                  variables: {
                    email: state.identity,
                    token: token,
                    password: state.secret
                  }
                });
                setState({ ...state, result: result.data.redeemUserPasswordResetToken });
                console.log('result', result);

                if (!result.data.redeemUserPasswordResetToken) {
                  reinitContext();
                  router.push('/signin');
                }

              } catch (err) {
                // if (err.t0) {
                   setResultError("Error");
                // }
                return;
              }



          }
        }
        >
          <H1>Reset Password</H1>
          {state.result && (
            <Notice title="Error" tone="negative">
              {state.result.message}
            </Notice>
          )}

          {resultError && (
            <Notice title="Error" tone="negative">
              {resultError}
            </Notice>
          )}
          <Stack gap="medium">
            <VisuallyHidden as="label" htmlFor="identity">
              "email"
            </VisuallyHidden>
            <TextInput
              id="identity"
              name="identity"
              value={state.identity}
              onChange={e => setState({ ...state, identity: e.target.value })}
              placeholder="Email"
              ref={identityFieldRef}
            />
              <Fragment>
                <VisuallyHidden as="label" htmlFor="password">
                "Password"
                </VisuallyHidden>
                <TextInput
                  id="password"
                  name="password"
                  value={state.secret}
                  onChange={e => setState({ ...state, secret: e.target.value })}
                  placeholder="Password"
                  type="password"
                />
              </Fragment>
          </Stack>


            <Stack gap="medium" across>
              <Button
                weight="bold"
                tone="active"
                type="submit"
              >
                Reset Password
              </Button>
            </Stack>
          )}
        </Stack>
  </FormContainer>

    )
}
