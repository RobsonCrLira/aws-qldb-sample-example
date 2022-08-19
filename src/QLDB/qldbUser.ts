import {
    QldbDriver,
    TransactionExecutor,
    RetryConfig,
} from 'amazon-qldb-driver-nodejs';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { Agent } from 'https';
import { UserModel } from '../shared/interfaces/DTOs/UsersDTO';
import { LogUser, LogUserDTO } from '../shared/interfaces/logs/logUser';

export class QldbUser implements LogUser {
    async query({ data, method }: LogUserDTO): Promise<void> {
        const maxConcurrentTransactions: number = 10;
        const agentForQldb: Agent = new Agent({
            keepAlive: true,
            maxSockets: maxConcurrentTransactions,
        });
        const serviceConfigurationOptions: ClientConfiguration = {
            region: 'us-east-1',
            httpOptions: {
                agent: agentForQldb,
            },
        };
        const retryLimit: number = 4;
        // Use driver's default backoff function for this example (no second parameter provided to RetryConfig)
        const retryConfig: RetryConfig = new RetryConfig(retryLimit);
        const driver: QldbDriver = new QldbDriver(
            'poc-teste',
            serviceConfigurationOptions,
            maxConcurrentTransactions,
            retryConfig,
        );
        switch (method) {
            case 'ínsert':
                await driver.executeLambda(async (txn: TransactionExecutor) => {
                    await this.insertDocument(txn, data);
                });
                break;

            case 'update':
                await driver.executeLambda(async (txn: TransactionExecutor) => {
                    await this.updateDocuments(txn, data);
                });
                break;
            case 'delete':
                await driver.executeLambda(async (txn: TransactionExecutor) => {
                    await this.deleteDocuments(txn, data);
                });
                break;

            default:
                break;
        }
    }

    private async insertDocument(
        txn: TransactionExecutor,
        data: UserModel,
    ): Promise<void> {
        const user: Record<string, any> = {
            id: data.id,
            email: data.email,
            full_name: data.full_name,
            password_hash: data.password_hash,
        };
        await txn.execute('INSERT INTO users ?', user);
    }

    private async updateDocuments(
        txn: TransactionExecutor,
        data: UserModel,
    ): Promise<void> {
        console.log(data);
        await txn.execute(
            'UPDATE users SET full_name = ? , email = ?, password_hash = ? WHERE id = ?',
            data.full_name,
            data.email,
            data.password_hash,
            data.id,
        );
    }

    private async deleteDocuments(
        txn: TransactionExecutor,
        data: UserModel,
    ): Promise<void> {
        await txn.execute('DELETE FROM users WHERE id = ?', data.id);
    }
}
