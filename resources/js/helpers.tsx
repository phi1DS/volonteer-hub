export function getAssetsPath(uri: string): string {
    return `/storage/${uri}`;
}

export function getDefaultProfilePicturePath(): string {
    return getAssetsPath('profileImages/profile_default.jpg')
}
