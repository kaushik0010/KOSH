import { User } from "@/src/features/auth/models/user.model";
import { GroupMembership } from "../models/groupMembership.model";

export type GroupMemberPopulated = GroupMembership & {userId: User};