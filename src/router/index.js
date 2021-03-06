import Router from 'vue-router';
import store from '@/store';
import { getMode, getRoutes } from '@/builds/configs';
import { ExtensionHelpers } from '@/helpers';
import { isAddress } from '@/helpers/addressUtils';
import { Toast, Misc } from '@/helpers';
import { MEW_CX } from '@/builds/configs/types';

const storeQuery = query => {
  const queryKeys = Object.keys(query);
  if (queryKeys.length > 0) {
    const blankObj = {};
    for (const key in query) {
      blankObj[key] = Misc.stripTags(query[key]);
    }

    store.dispatch('main/saveQueryVal', blankObj);
  }
};

const router = new Router({
  mode: getMode(),
  routes: getRoutes(),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    window.scrollTo(0, 0);
  }
});

router.beforeResolve((to, from, next) => {
  storeQuery(to.query);
  if (to.meta.hasOwnProperty('requiresAuth')) {
    next();
  } else {
    if (store.state.main.wallet === null) {
      if (BUILD_TYPE === MEW_CX) {
        ExtensionHelpers.getAccounts(item => {
          const hasStoredWallet = Object.keys(item).filter(key => {
            const newObj = {};
            if (isAddress(key)) {
              return (newObj[key] = item[key]);
            }
          });
          if (hasStoredWallet.length > 0) {
            next('/');
          } else {
            next({ name: 'AccessWalletLayout' });
          }
        });
      } else {
        store.dispatch('main/setLastPath', to.path);
        next({ name: 'AccessWalletLayout' });
      }
    } else {
      if (store.state.main.path !== '') {
        const localPath = store.state.main.path;
        store.dispatch('main/setLastPath', '');
        rerouter(localPath, next, { path: localPath });
      } else {
        rerouter(to.fullPath, next);
      }
    }
  }
});

const rerouter = (path, next, elseParam) => {
  const reroute = Misc.dateChecker();

  if (reroute && path.includes('manage-ens')) {
    next({ path: path.replace('/manage-ens', '') });
    Toast.responseHandler(this.$t('ens.toast.unavailable'), Toast.WARN);
  } else {
    elseParam ? next(elseParam) : next();
  }
};

export default router;
