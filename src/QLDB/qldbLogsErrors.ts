import {
    QldbDriver,
    TransactionExecutor,
    RetryConfig,
} from 'amazon-qldb-driver-nodejs';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { Agent } from 'https';
import { LogErrors, LogErrorsDTO } from '../shared/interfaces/logs/logErrors';

export class QldbLogError implements LogErrors {
    async log(data: LogErrorsDTO): Promise<void> {
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
        await driver.executeLambda(async (txn: TransactionExecutor) => {
            await txn.execute('INSERT INTO log_errors ?', data);
        });
    }
}
