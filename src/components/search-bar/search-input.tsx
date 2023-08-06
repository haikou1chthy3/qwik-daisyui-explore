import { component$, useSignal, useStore } from "@builder.io/qwik";
export default component$(() => {

    const store = useStore({
        people: [
            {
                id: 1,
                name: 'Wade Cooper',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 2,
                name: 'Arlene Mccoy',
                checked: false,
                avatar:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 3,
                name: 'Devon Webb',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
            },
            {
                id: 4,
                name: 'Tom Cook',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 5,
                name: 'Tanya Fox',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 6,
                name: 'Hellen Schmidt',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 7,
                name: 'Caroline Schultz',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 8,
                name: 'Mason Heaney',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 9,
                name: 'Claudie Smitham',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 10,
                name: 'Emil Schaefer',
                checked: true,
                avatar:
                    'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
    })

    const selected = useSignal(store.people[3])
    return (<>
        <div class="dropdown">
            <input tabindex="0" class="input join-item select-bordered w-full max-w-xs" placeholder="Search Input" />
            <div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full mt-2">
                    {
                        store.people.map((person) => (
                            <>
                                <li>
                                    <label class="label cursor-pointer">
                                        <div class="flex justify-between items-center">
                                            <input type="checkbox" checked={person.checked} class="checkbox checkbox-primary"
                                                onChange$={(_, el) => {
                                                    person.checked = el.checked
                                                    console.log(person)
                                                }}
                                            />
                                            <img src={person.avatar} alt="" class="h-5 w-5 flex-shrink-0 rounded-full ml-2" />
                                            <span class="label-text ml-2">{person.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                    </label>
                                </li>
                            </>)
                        )
                    }
                </ul>
            </div>
        </div>
    </>)
})