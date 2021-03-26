<template>
    <nav class="menu">
        <div class="wrapper">
            <ul class="menu-list">
                <li class="menu-list-item"><router-link to="/signin" class="menu-list-link signin" href="#">Sign in</router-link></li>
                <li class="menu-list-item"><router-link to="/dashboard" class="menu-list-link dashboard" href="#">Dashboard</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>

</script>

<style scoped>
    .menu{
        height: 92px;
        background: #ffffff;
        box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .wrapper {
        margin: 0 auto;
        max-width: 1050px;
        width: 90%;
    }

    .signin {
        color: #ea00ff;
        border: 1px solid #ea00ff;
    }

    .dashboard {
        color: #ff00a2;
        border: 1px solid #ff00a2;
    }
    
    .menu-list-link {
        text-decoration: none;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 21.5px;
        border-radius: 16.5px;
        padding-bottom: 2px;
        font-size: 15px;
    }

    .menu-list-item:nth-child(1n+2) .menu-list-link {
        margin-left: 20px;
    }

    .menu-list {
        display: flex;
        flex-direction: row;
    }
</style>