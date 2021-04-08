import { UserResident } from "src/user-resident/entities/user-resident.entity"
import { getRepository } from "typeorm"

export const setDefaultUser = async () => {
    const userAdminRepository = getRepository<UserResident>(UserResident)

    const defaultUser = await userAdminRepository
        .createQueryBuilder()
        .where('username = :username', { username: 'administrator'})
        .getOne()

    if (!defaultUser) {
        const adminUSer = userAdminRepository.create({
            username: 'administrator',
            password: '12345678',
            roles: ['ADMIN']
        })
        return await userAdminRepository.save(adminUSer);
    }
}