import noUiSlider from 'nouislider';


export default function slider({
    element,
    start,
    connect,
    pips = false,
    range = {
        min: 0,
        max: 10
    },
    state,
    step,
    behaviour,
    snap,
    tooltips,
}) {
    return {
        start,
        element,
        connect,
        range,
        pips,
        component: null,
        state,
        step,
        behaviour,
        tooltips,
        onChange,
        init() {
            this.component = document.getElementById(this.element);
            noUiSlider.cssClasses.target += ' range-slider';

            let slider = noUiSlider.create(this.component, {
                start: window.Alpine.raw(start),
                connect: window.Alpine.raw(connect),
                range: window.Alpine.raw(range),
                tooltips,
                step: window.Alpine.raw(step),
                behaviour: window.Alpine.raw(behaviour),
                snap: window.Alpine.raw(snap),
                pips: window.Alpine.raw(pips),
            });

            
            this.component.noUiSlider.on('update', (values) => {

                document.addEventListener('livewire:load', function () {
                    setInterval(() => Livewire.dispatch('nextSlot'), 4000);
                })

                for (let i = 0; i < values.length; i++) {
                    window.Livewire.dispatch(this.state[i], values[i])
                }
            });
        }
    }
}