export interface Decrypter {
  decrypt (token: String): Promise<string>
}
