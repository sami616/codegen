import { useState, useEffect } from 'react'

interface UseQueryOpts<Variables> {
	variables?: Variables
}

export function useQuery<Data, Variables>(query: string, { variables }: UseQueryOpts<Variables> = {}) {
	const [data, setData] = useState<Data | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function getData() {
			setLoading(true)
			setError(null)
			try {
				const res = await fetch(`https://graphqlzero.almansi.me/api`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query, variables }),
				})
				const { data, errors } = await res.json()

				if (errors) throw new Error(errors)
				setData(data)
				setLoading(false)
			} catch (e) {
				setError(e)
				setLoading(false)
			}
		}
		getData()
	}, [query, variables])

	return { data, loading, error }
}
