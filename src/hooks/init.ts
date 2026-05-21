/**
 * @file src/hooks/init.ts
 * handles module initialization and registers the global yugen_utils api.
 **/

import { YugenUtils } from '../module/yugen-utils.js';

export const init_hook = ( ) => 
{
	/** listen for initialization to register global api **/
	Hooks.once( 'init', ( ) => 
	{
		( globalThis as any ).yugen_utils = YugenUtils;

		console.log( 'yugen-utils | initialized shared utility library successfully' );
	} );
};
