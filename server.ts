import { Type } from '@sinclair/typebox'
import { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteShorthandOptions } from 'fastify'

const EnumType = [Type.Boolean(), Type.String()]

export interface Request { }

type FOptions = RouteShorthandOptions<
	RawServerDefault,
	RawRequestDefaultExpression<RawServerDefault>,
	RawReplyDefaultExpression<RawServerDefault>,
	Request
>

namespace Schemas {
  export const Response = Type.Object(
    { test: Type.Union(EnumType) },
    {
      $id: "urn:test:test:test:test:test#response",
      description: "Schema for test",
      additionalProperties: false
    }
  )
}

export const Route_options: FOptions = {
	schema: {
		response: {
			200: Schemas.Response,
		}
	}
}

const fastify = require('fastify')({ logger: true })

fastify.get('/test', Route_options, async () => {
  return { test: 'world' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()