import React, {createContext} from 'react';

type Action =
	| { type: 'ADD_FILES', files: File[] }
	| { type: 'REMOVE_FILE', file: File };

export function uploadReducer(state: File[], action: Action): File[] {
	switch (action.type) {
		case 'ADD_FILES': {
			if (action.files.length === 0) return state;

			// check old files to make sure none have the same name
			const newFiles = action.files.filter(file => !state.some(oldFile => oldFile.name === file.name)) // filter out files with the same name
				.filter(file => file.size !== 0 && file.size < 1000000000); // filter out files that are too large or empty
			return [...state, ...newFiles];
		}
		case 'REMOVE_FILE':
			return state.filter(file => file !== action.file);
		default:
			return state;
	}
}

export const UploadContext = createContext<{
	state: File[];
	dispatch: React.Dispatch<Action>;
}>({
	state: [],
	dispatch: () => null
});