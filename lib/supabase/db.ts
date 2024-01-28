import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

dotenv.config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  console.log('DATABASE_URL not found')
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(client, { schema })
const migrateDb = async () => {
  try {
    console.log('Migrating database...')
    await migrate(db, { migrationsFolder: 'migrations' })
    console.log('migrated successfully')
  } catch (error) {
    console.log(error)
  }
}
migrateDb()
export default db
