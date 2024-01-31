export default class Categories {
    private allButton: HTMLElement | null = document.querySelector('.all');
    private activeButton: HTMLElement | null = document.querySelector('.active');
    private doneButton: HTMLElement | null = document.querySelector('.done');

    changeCategory(category: string) {

        switch (category) {
            case 'all':

                this.removeCurrentCategory()
                this.setCurrentButton(this.allButton!)
                document.querySelectorAll('.todo-item').forEach((item) => item.classList.remove('hide'));
                break;
            case 'active':
                this.removeCurrentCategory();
                this.setCurrentButton(this.activeButton!)
                document.querySelectorAll('.todo-item').forEach((item) => item.classList.remove('hide'));
                document.querySelectorAll('.todo-item--done').forEach((item) => item.classList.add('hide'));
                break;
            case 'done':
                this.removeCurrentCategory();
                this.setCurrentButton(this.doneButton!)
                document.querySelectorAll('.todo-item--done').forEach((item) => item.classList.remove('hide'));
                break;
            default:
                this.removeCurrentCategory();
                this.setCurrentButton(this.allButton!)

        }

    }

    removeCurrentCategory() {
        this.allButton?.classList.remove('button--primary');
        this.activeButton?.classList.remove('button--primary');
        this.doneButton?.classList.remove('button--primary');
        document.querySelectorAll('.todo-item').forEach(item => {
            item.classList.add('hide');
        })
    }

    setCurrentButton(button: HTMLElement) {
        button.classList.add('button--primary');
    }
}