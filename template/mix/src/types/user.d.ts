export interface IUser {
    id?: string
    name: string
    phone: string
    roleCode: any;
    role: string
    /**
     * 状态 0：停用，1：正常
     */
    status?: number

    /**
     * 学院编号
     */
    collegeId: string
    collegeName: string

    /**
     * 专业编号
     */
    facultyId: string
    facultyName: string
    classId: string
    className: string
}
