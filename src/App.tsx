import { useQuery } from './useQuery'

export function App() {
	const { data, error, loading } = useQuery(/* GraphQL */ `
		fragment userFields on User {
			name
			email
			phone
		}

		fragment postFields on Post {
			id
			title
			body
			user {
				...userFields
			}
		}

		query getPosts {
			posts {
				data {
					...postFields
				}
			}
		}
	`)

	if (loading) return <p>Loading...</p>
	if (error) return <p>{error.message}</p>
	return (
		<>
			{(data as any).posts.data.map((post: any) => {
				return <>{post.title}</>
			})}
		</>
	)
}
