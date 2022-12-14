import bcrypt from 'bcrypt';
import { HashComparer } from '../../shared/interfaces/protocols/encrypter/hashComparer';
import { Hasher } from '../../shared/interfaces/protocols/encrypter/hasher';

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) {}

    async hash(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, 12);
        return hash;
    }

    async compare(value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash);
        return isValid;
    }
}
