export type MiUIType = typeof miUIType[number];
export type MiUISize = typeof miUISize[number];

export const miUIType = [ 'success' , 'primary' , 'danger' , 'warning' , 'default' , '' ] as const;

export const miUISize = ['huge' , 'middle' , 'tiny', ''] as const;


