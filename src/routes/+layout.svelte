<script lang="ts">
    import '../app.postcss';
    import { supabase } from '$lib/supabaseClient'
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import  Nav  from '../components/nav/+Nav.svelte'

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            invalidate('supabase:auth')
        })

        return () => {
            subscription.unsubscribe()
        }
    })
</script>

<Nav/>
<slot/>