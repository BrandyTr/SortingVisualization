class SortFactory {
    static createSortAlgorithm(algorithmType) {
        switch (algorithmType) {
            case 'bubble':
                return new BubbleSort();
            case 'selection':
                return new SelectionSort();
            case 'insertion':
                return new InsertionSort();
            default:
                throw new Error('Unknown sorting algorithm type');
        }
    }
}
